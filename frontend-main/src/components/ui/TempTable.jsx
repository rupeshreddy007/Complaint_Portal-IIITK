import stylesCss from "@pages/Dashboard/styles.module.css";
import {handleScroll, loadMore, RenderItems} from "@pages/Dashboard/utils.jsx";
import complaintStyle from "@components/styles/complaint.module.css";
import VerifierComplaint from "@components/Complaints/VerifierComplaint.jsx";
import {useRef, useState} from "react";
import {statusMap, timeGap} from "@/constants.js";

const divStyle= "flex items-center gap-3 p-2 mx-1 my-2 border border-gray-300 rounded shadow w-fit";


const complaintsDiv = ({props, styles, data, searchParam, queries,altsearchParam, filterParam,options, parser, Component, header}) => {

    const [filter, setFilter] = useState(-1);
    const [search, setSearch] = useState('');

    let timer;
    const handleSearch = (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setSearch(event.target.value.toLowerCase());
        }, timeGap);
    }
    let filteredData;
    if(options) {
        filteredData = altsearchParam ? data.filter(item => {
            if(filter !== item[filterParam] && filter !== -1) return false;
            if(search === '') return true;
            return item[searchParam].includes(search) || item[altsearchParam].includes(search);
        }) : data.filter(item => {
            if(filter !== item[filterParam]) return false;
            if(search === '') return true;
            return item[searchParam].includes(search);
        });
    } else {
        filteredData = altsearchParam ? data.filter(item => {
            if(search === '') return true;
            return item[searchParam].includes(search) || item[altsearchParam].includes(search);
        }) : data.filter(item => {
            if(search === '') return true;
            return item[searchParam].includes(search);
        })
    }
    const ref = useRef(null);

    if(ref.current) {
        const isOverflowingVertically = ref.current.scrollHeight > ref.current.clientHeight;
        // console.log('isOverflowingVertically : ', isOverflowingVertically);
        if(!isOverflowingVertically) {
            // console.log('loading more');
            queries.forEach((queryInstance) => loadMore(queryInstance));
        }
    }
    let scrollTimer;
    const debouncedScrollHandler = (event) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            handleScroll(event, queries);
        }, timeGap);
    }
    return (
        <>
            <div className='flex items-center'>
                    { options && (
                        <div className={divStyle}>
                            <label htmlFor="filter" className="text-base capitalize">filter :</label>
                            <select id="filter"
                                 onChange={(event) => {
                                     setFilter(parser ? parser(event.target.value) : event.target.value)
                                 }}
                                 className="p-1 text-base border-2 border-black rounded" name="filter">
                                {options.map(({value, name}) => (
                                <option key={value} value={value}>{name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                <div className={divStyle}>
                    <label htmlFor="search" className="text-base capitalize">Search :</label>
                    <input type='text' placeholder='Enter Complaint Id' onChange={handleSearch}/>
                </div>
            </div>
            <div
                ref={ref}
                className={stylesCss.solved_complaints}
                style={{...styles}}
                onScroll={(event) => debouncedScrollHandler(event)}
            >
                <RenderItems data={filteredData} Component={Component} Header={header} props={props}/>
            </div>
        </>
    )
};

export default complaintsDiv;
