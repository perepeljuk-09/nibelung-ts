type CommonButtonNewProps = {
  isDisabled?: boolean;
  style?: string;
};

type PrimaryButtonNewProps = CommonButtonNewProps & {
  primary: boolean;
  secondary?: never;
  arrow: boolean;
};
type SecondaryButtonNewProps = CommonButtonNewProps & {
  primary?: never;
  secondary: boolean;
  arrow?: never;
};

const ButtonNew = ({
  isDisabled,
  style,
  primary = false,
  secondary = false,
  arrow = false,
}: PrimaryButtonNewProps | SecondaryButtonNewProps) => {
  return <button />;
};

export default ButtonNew;

type ComponentProps<T> = {
  array: T[];
};

function getKeyFromObj<Obj extends object, Key extends keyof Obj>(
  obj: Obj,
  key: Key
) {
  return obj[key];
}

type Mos = {
  name: string;
};

type Item = {
  age: number;
};

const ComponentForArray2 = <Obj extends Mos | Item, Key extends keyof Obj>(
  objs: Obj[],
  property: Key
) => {
  return (
    <div>
      <h1>{property.toString()}</h1>
    </div>
  );
};

const MosData: Mos[] = [{ name: 'iven' }, { name: 'alex' }];
const Items: Item[] = [{ age: 2 }, { age: 66 }];

ComponentForArray2(MosData, 'name');
ComponentForArray2(Items, 'age');

const ComponentForArray = <Obj extends Mos | Item, Key extends keyof Obj>(
  obj: ComponentProps<Obj>,
  property: Key
) => {
  return (
    <div>
      <div>{obj.array.length}</div>
    </div>
  );
};

const JS = () => {
  return (
    <>
      <ComponentForArray array={MosData} />
      <ComponentForArray array={Items} />
    </>
  );
};

const first = { a: 2, b: 'a' };
const second = { a: 2, b: 'a', c: 4, d: 5 };

console.log(getKeyFromObj(first, 'a'));
console.log(getKeyFromObj(second, 'd'));
