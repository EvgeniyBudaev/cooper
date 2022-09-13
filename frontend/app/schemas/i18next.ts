import { z } from 'zod';

const TranslationKeysSchema = z.union([z.string(), z.string().array()]);

const TranslationDefaulValueSchema = z.string();

const StringMapSchema = z.record(z.any());

const TranslationOptionsSchema = z.union([StringMapSchema, z.string()]);

export const TranslationParamsKeysOnlySchema = z.tuple([TranslationKeysSchema]);

export const TranslationParamsKeysOptionsSchema = z.tuple([
  TranslationKeysSchema,
  TranslationOptionsSchema.optional(),
]);

export const TranslationParamsExtendedSchema = z.tuple([
  TranslationKeysSchema,
  TranslationDefaulValueSchema.optional(),
  TranslationOptionsSchema.optional(),
]);

export const TranslationParamsSchema = z.union([
  TranslationParamsKeysOnlySchema,
  TranslationParamsKeysOptionsSchema,
  TranslationParamsExtendedSchema,
]);
