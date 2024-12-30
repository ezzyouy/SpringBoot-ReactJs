import React from "react";

export const Pagination: React.FC<{
  currentPage: number;
  totalPage: number;
  paginate: any;
}> = (props) => {
  const pageNumbers : number[] = [];
  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPage >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPage >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }
    pageNumbers.push(props.currentPage);
    if (props.totalPage >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPage >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }
  return <nav aria-label="..." key={Math.random()}>
    <ul className="pagination">
        <li className="page-item" onClick={()=>props.paginate(1)}>
            <button className="page-link">
                First Page
            </button>
        </li>
        {pageNumbers.map(number=>(
            <li key={Math.random()} onClick={()=>props.paginate(number)} className={'page-items' + (props.currentPage === number ? 'active':'')}>
                <button className="page-link">
                    {number}
                </button>
            </li>
        ))}
        <li onClick={()=>props.paginate(props.totalPage)} className='page-items'>
                <button className="page-link">
                    Last Page
                </button>
            </li>
    </ul>
  </nav>;
};
