import PlantIdentifier from "../../components/Plantidentifier";

export default function IdentifyCategory({ params }: { params: { categorySlug: string } }) {
  return <PlantIdentifier categorySlug={params.categorySlug} />;
}