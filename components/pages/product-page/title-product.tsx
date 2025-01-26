interface TitleProductProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
}
const TitleProduct: React.FC<TitleProductProps> = ({ name }) => (
  <h1 className="text-4xl font-bold tracking-tight text-gray-900">{name}</h1>
);

export default TitleProduct;
