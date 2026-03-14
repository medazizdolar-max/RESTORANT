import DishClient from './dish-client';

export async function generateStaticParams() {
  return [
    { dishId: 'tajine' },
    { dishId: 'meat-tajine' },
    { dishId: 'pastilla' },
    { dishId: 'couscous' },
  ];
}

export default async function DishPage({ params }: { params: Promise<{ dishId: string }> }) {
  const { dishId } = await params;
  return <DishClient dishId={dishId} />;
}
