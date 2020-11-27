import React from 'react';
import Loading from '../components/Loading';
import { expansion } from '../types';
import { getExpansions } from '../utils/api';

const Expansions = () => {
  const [data, setData] = React.useState<expansion[]>();

  React.useEffect(() => {
    (async() => {
      setData(await getExpansions());
    })();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <section>
      {data.map(({ name, cards }) => (
        <p>{name} · {cards}</p>
      ))}
    </section>
  )
}

export default Expansions;