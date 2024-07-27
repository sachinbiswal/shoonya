import pageButtonCSS from"./pageButton.module.css"
export const PageButtons = ({ onNext, onPrevious, currentPage ,disableNext}) => {
    console.log(currentPage)
  return (
    <div className={pageButtonCSS.container}>
      <button disabled={currentPage===1} onClick={()=>onPrevious()}>Previous</button>
      <button onClick={()=>onNext()} disabled={disableNext}>Next</button>
    </div>
  );
};
