import type {TCatalogSlug} from "~/types/path";

export const backendBase = "http://localhost:5000/";

export enum CatalogSlug {
	CopperUtensils = "Медная посуда",
	Gidrolat = "Для гидролатов",
	EssentialOils = "Для эфирных масел",
	Accessories = "Аксессуары из меди"
}

export const mapCatalogSlugToTitle = new Map<TCatalogSlug, CatalogSlug>([
	["mednaya-posuda", CatalogSlug.CopperUtensils],
	["gidrolat", CatalogSlug.Gidrolat],
	["efirnye-masla", CatalogSlug.EssentialOils],
	["aksessuary", CatalogSlug.Accessories]
]);
