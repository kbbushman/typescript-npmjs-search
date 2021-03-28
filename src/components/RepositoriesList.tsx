import { useState } from 'react';
import { useActons } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const RespositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActons();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      <ul>
        {!error &&
          !loading &&
          data.map((packageName) => <li key={packageName}>{packageName}</li>)}
      </ul>
    </div>
  );
};

export default RespositoriesList;
