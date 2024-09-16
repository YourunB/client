type Props = {
  method: string;
  setMethod: (method: string) => void;
};
export const MethodSelector: React.FC<Props> = ({ method, setMethod }) => {
  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="GET"
          checked={method === 'GET'}
          onChange={handleMethodChange}
          className="form-radio"
        />
        <span>GET</span>
      </label>
      <label>
        <input
          type="radio"
          value="POST"
          checked={method === 'POST'}
          onChange={handleMethodChange}
          className="form-radio"
        />
        <span>POST</span>
      </label>
    </div>
  );
};
