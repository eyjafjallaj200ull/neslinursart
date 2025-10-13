import { createArtworkSchemaType } from "@/zod-schemas/artwork";

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof createArtworkSchemaType]?: string[];
  };
  inputs?: {
    [k: string]: FormDataEntryValue;
  }
}
