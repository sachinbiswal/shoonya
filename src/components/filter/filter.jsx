import filterCSS from "./filter.module.css";

export const Filter = ({
  onDateChange,
  onTypeChange,
  onSearch,
  typeOptions,
  dateOptions,
}) => {
  return (
    <div className={filterCSS.container}>
      <div>
        <select
          name="type"
          id="type"
          defaultValue=""
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">Category</option>
          {typeOptions.map((type) => (
            <option value={type} key={type}>
              {`${type[0].toUpperCase()}${type.slice(1)}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="date"
          id="date"
          defaultValue=""
          onChange={(e) => onDateChange(e.target.value)}
        >
          <option value="">Date</option>
          {dateOptions.map((date) => (
            <option value={date} key={date}>
              {`${date}-${Number(date) + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by title or location!!"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
