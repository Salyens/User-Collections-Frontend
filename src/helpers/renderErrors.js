const renderErrors = (errors) => {
  if (!errors || !errors.length) return;
  
  const renderErrorsList = () => (
    <ul className="text-danger mt-3">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );

  const renderOneError = () => (
    <ul className="text-danger mt-3">
      <li>{errors}</li>
    </ul>
  );

  return Array.isArray(errors) ? renderErrorsList() : renderOneError();
};

export default renderErrors;
