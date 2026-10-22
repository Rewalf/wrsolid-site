import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const link = z.object({ label: z.string(), href: z.string() });
const action = link.extend({ style: z.enum(['primary', 'secondary']).default('primary') });
const heading = {
  id: z.string(),
  eyebrow: z.string().optional(),
  title: z.string(),
  intro: z.string().optional(),
};

export const iconNames = ['cloud', 'code', 'pipeline', 'compass'] as const;

const heroSection = z.object({
  type: z.literal('hero'),
  id: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  lead: z.string(),
  actions: z.array(action).min(1),
  highlights: z.array(z.string()).default([]),
});

const servicesSection = z.object({
  type: z.literal('services'),
  ...heading,
  items: z.array(
    z.object({
      icon: z.enum(iconNames),
      title: z.string(),
      text: z.string(),
      points: z.array(z.string()).default([]),
      extra: z.object({ title: z.string(), text: z.string() }).optional(),
    }),
  ),
});

const processSection = z.object({
  type: z.literal('process'),
  ...heading,
  steps: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
  note: z.object({ title: z.string(), text: z.string() }).optional(),
});

const engagementSection = z.object({
  type: z.literal('engagement'),
  ...heading,
  options: z.array(
    z.object({
      name: z.string(),
      duration: z.string(),
      text: z.string(),
      points: z.array(z.string()).default([]),
      cta: link,
    }),
  ),
});

const principlesSection = z.object({
  type: z.literal('principles'),
  ...heading,
  items: z.array(z.object({ title: z.string(), text: z.string() })),
});

const experienceSection = z.object({
  type: z.literal('experience'),
  ...heading,
  industriesTitle: z.string(),
  industries: z.array(z.string()),
  stackTitle: z.string(),
  stack: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
});

const aboutSection = z.object({
  type: z.literal('about'),
  ...heading,
  paragraphs: z.array(z.string()).min(1),
  credentials: z.array(z.string()).default([]),
  links: z.array(link).default([]),
  quote: z.string().optional(),
});

const contactSection = z.object({
  type: z.literal('contact'),
  ...heading,
  email: z.email(),
  subject: z.string(),
  cta: z.string(),
});

export const sectionSchema = z.discriminatedUnion('type', [
  heroSection,
  servicesSection,
  processSection,
  engagementSection,
  principlesSection,
  experienceSection,
  aboutSection,
  contactSection,
]);

const pageSchema = z.object({
  meta: z.object({ title: z.string(), description: z.string() }),
  sections: z.array(sectionSchema).min(1),
});

const siteSchema = z.object({
  email: z.email(),
  nav: z.array(link),
  cta: link,
  footer: z.object({
    description: z.string(),
    columns: z.array(z.object({ title: z.string(), links: z.array(link) })),
    copyright: z.string(),
  }),
});

export type Section = z.infer<typeof sectionSchema>;
export type SectionOf<T extends Section['type']> = Extract<Section, { type: T }>;
export type PageContent = z.infer<typeof pageSchema>;
export type SiteContent = z.infer<typeof siteSchema>;

async function load<T>(schema: z.ZodType<T>, locale: string, name: string): Promise<T> {
  const file = path.join(CONTENT_DIR, locale, `${name}.yaml`);
  const data = parse(await readFile(file, 'utf8'));
  const result = schema.safeParse(data);
  if (!result.success) {
    // Fail the build with the file and the exact field that is wrong.
    throw new Error(`Invalid content in ${path.relative(process.cwd(), file)}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const getPage = (locale: string, name: string) => load(pageSchema, locale, name);
export const getSite = (locale: string) => load(siteSchema, locale, 'site');
