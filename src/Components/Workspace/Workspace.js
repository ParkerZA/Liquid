import React, {useState, useEffect} from 'react'
import "./Workspace.css"
import axios from "axios";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Queries from "../Queries/Queries"
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Paper } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive'
import { ReactComponent as Spinner } from "../../Spinner-1s-200px.svg";

const Workspace = () => {

    const [loading, setLoading] = useState(true);
    const [rates, setRates] = useState([]);
    const [rate, setRate] = useState("");
    const [target, setTarget] = useState("");
    const [amount, setAmount] = useState();
    const [conversion, setConversion] = useState();
    const [queries, setQueries] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const isTabletOrMobile = useMediaQuery({ maxWidth: 768 })

    useEffect(() => {
        setLoading(true)
        async function getData() {
            const response = await axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=[INSERT KEY HERE]`);
            let currencies = Object.keys(response.data.results).map(currency => {
                return currency;
            })
            setRates(currencies);
        }
        getData();
        setLoading(false);
    }, [])

    function handleChange(e) {
        console.log(e.target.value);
        setRate(e.target.value);
    }

    function handleTarget(e) {
        console.log(e.target.value);
        setTarget(e.target.value);
    }

    function handleAmount(e) {
        console.log(e.target.value);
        setAmount(e.target.value);
    }       

    async function convert() {
        setSubmitting(true);
        const query = rate + "_" + target;
        const response = await axios.get('https://free.currconv.com/api/v7/convert?q=' + query + `&compact=ultra&apiKey=[INSERT KEY HERE]`);
        let q = [...queries];
        q.push({
            from: rate,
            amount: amount,
            to: target,
            conversion: response.data[query] * amount
        });
        setQueries(q);
        setConversion(response.data[query]);
        setSubmitting(false);
    }

    const style = {
        display: "flex",
        flexDirection: isTabletOrMobile? "column" : "row",
        justifyContent:  "space-evenly",
        height: isTabletOrMobile? "50vh": "auto",
        alignItems: "center",
        width: "80vw",
        margin: "0 auto"
    }

    const paper = {
        height: isTabletOrMobile? "70vh" : "40vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    }

    return (
        <div className="workspace">
            {loading? <Spinner />
                : 
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100vh", overflow: "hidden"}}>
                <Paper sx={{ minWidth: 120 }} style={paper}>
                    <div style={style}>
                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                        <Select
                                style={{width:"250px"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rate}
                                label="From"
                                onChange={handleChange}
                            >
                                {rates.map(rate => {
                                    return  <MenuItem key={rate} value={rate}>{rate}</MenuItem>
                                })}

                        </Select>
                        <TextField style={{width:"250px", height: "8vh"}} id="outlined-basic" label="Amount" variant="outlined" onChange={handleAmount} />
                        <InputLabel id="demo-simple-select-label">To</InputLabel>
                        <Select
                                style={{width:"250px", height: "8vh"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={target}
                                label="From"
                                onChange={handleTarget}
                            >
                                {rates.map(rate => {
                                    return  <MenuItem key={rate} value={rate}>{rate}</MenuItem>
                                })}

                        </Select>
                    </div>
                    <div>
                        {submitting? <Spinner style={{backgroundColor: "transparent", height: "50px"}}/> : 
                        <Button style={{marginTop: "2vh"}} onClick={convert} variant="contained">Convert</Button> 
                        }
 
                    </div>
                    <div>
                        <TextField style={{width:"250px", height: "8vh"}} id="outlined-basic" label={conversion} variant="standard" disabled/>
                    </div>

                </Paper>
                <div style={{marginTop: "5vh", height: "50vh", padding: "10px", overflowY: "scroll"}}>
                    <Queries queries={queries}/>
                </div>
            </div>
            }

        </div>
    )
}

export default Workspace;