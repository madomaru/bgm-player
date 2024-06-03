import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Button from '../Component/Button';

const YOUTUBE_API_KEY = 'AIzaSyDrD3vDFJDXeSysFlHgIF67xHN3Hjm4BDc'
// import ReactDOM from 'react-dom/client';

const Form = () =>{ 
    const [keywordsList,setKeywordsList] = useState(JSON.parse(localStorage.getItem('keywordsList')));
    const [timeList] =useState([
                {id: 0,value: "15min"},
                {id: 1,value: "30min"},
                {id: 2,value: "free"},
            ]);
    const [selectedKeywords,setSelectedKeywords] = useState(Array(3).fill(""));//three keywords
    const [selectedIdList,setSelectedIdList] = useState(Array(4).fill().map(e=>-1))
    const [selectedTimer,setSelectedTimer] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if(!keywordsList){
            setKeywordsList(Array(3).fill().map(e=>[]))
        }
    },[]);    
    function addKeyword(index,keyword){
        // if(keywordsList[index]){
            setKeywordsList((prevKeywordsList) =>{
                let newKeywordsList = JSON.parse(JSON.stringify(prevKeywordsList))
                newKeywordsList[index].push({id: keywordsList[index].length , value: keyword})
                let keywordJSON = JSON.stringify(newKeywordsList,undefined,1); 
                localStorage.setItem('keywordsList',keywordJSON);
                return newKeywordsList
            })
        
        
    }
    const selectKeyword = (index,value,id) =>{
        setSelectedKeywords((prevState) =>
            prevState.map(
                (prevKeyword,i) => (index ===  i  ? value : prevKeyword)
            ))
        setSelectedIdList((prevState) =>
        prevState.map(
            (prevId,i) => (index ===  i  ? id : prevId)
        ))
    }
    const selectTimer = (value,id) =>{
        setSelectedTimer(value)
        setSelectedIdList((prevState) =>
        prevState.map(
            (prevId,i) => (3 ===  i  ? id : prevId)
        ))
    }
    function ToPlayer(){
        if(selectedKeywords && selectedTimer){
            let isFree,secTimer
            if(selectedTimer === "free"){
                isFree = true
                secTimer = null
            }else{
                isFree = false
                secTimer = selectedTimer === "15min" ? 15*60 : 30*60
            }
            onSearchYoutube(selectedKeywords.join(" ")).then((videoId) =>{
                navigate("/player",{state: {videoId:videoId ,secTimer: secTimer,isFree: isFree}})
              })
            
        }else{
            alert("Please select keyword and timer.")
        }
    }
      async function onSearchYoutube(keyword){
        const searchKeyword = keyword + " bgm";
        let resultVideoId =""
        const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=id&q=${searchKeyword}&maxResults=5&videoDuration=long&key=${YOUTUBE_API_KEY}`;
        try{
          const res = await axios.get(url)
          const items = res.data.items
          const randomNumber = Math.floor(Math.random()*items.length);
          resultVideoId = items[randomNumber].id.videoId
        }catch(error){
          const {
            status,
            statusText
          } = error.response;
          console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }
        return resultVideoId
        
        
      }
    return (
        <div className='h-screen'>
            <div>
                <h2 className ="text-xl ">KEYWORD</h2>
                {keywordsList && keywordsList.map((childList,index) => {
                    return <div>
                        <p>{index+1}</p>
                        <ButtonList
                            key = {index} 
                            valueList = {childList}
                            onClick = {(value,id)=>selectKeyword(index,value,id)}
                            selectedId = {selectedIdList[index]}    
                        />
                        <AddKeyword onClick={keyword =>addKeyword(index,keyword)}/>
                    </div>
                })}
                {/* タイマー選択 */}
                <h2>Select Timer</h2>
                <ButtonList
                    valueList = {timeList}
                    onClick = {(value,id)=>selectTimer(value,id)}
                    selectedId = {selectedIdList[3]} 
                />

                <div className="mt-10 mx-auto ">
                    <Button value = "Play!" onClick={()=>ToPlayer()}/>
                </div>
                
            </div>
        </div>
    
    );
    
}
const AddKeyword = (props) =>{
    const [keyword,setKeyword] = useState("");
    const [isInput,setIsInput] = useState(false);
    function showInput(){
        setIsInput(true)
    }
    function handleChange(event){
        setKeyword(event.target.value)
    }
    function OnAddClick(){
        if(keyword){
            props.onClick(keyword);
            setIsInput(false)
        }else{
            alert("Please input add keyword.")
        }
        
    }
    if(isInput){
        return  <div>
                    <input className='border rounded border-blue-400 text-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' type="text"  onChange = {(event) => handleChange(event)}/>
                    <Button value = "add" onClick = {() => OnAddClick()}/>
                </div>;
    }else{
        return  <Button 
                    value = "+"
                    onClick = {() =>showInput()}
                />
    }
        
    
}


const ButtonList = (props) =>{ 
    return (
        props.valueList.map((object) => {
            let selected = false;
            if(object.id === props.selectedId){
                selected = true;
            }
            return <Button 
                key={object.id.toString()}
                value = {object.value}
                selected = {selected}
                onClick = {() => props.onClick(object.value,object.id)}
            />
        }
        )
    );
}



export default Form;