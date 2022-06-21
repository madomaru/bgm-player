import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyDrD3vDFJDXeSysFlHgIF67xHN3Hjm4BDc'
// import ReactDOM from 'react-dom/client';

const Form = () =>{ 
    const [keywordsList,setKeywordsList] = React.useState(JSON.parse(localStorage.getItem('keywordsList')));
    const [timeList,setTimeList] =React.useState([
                {id: 0,value: "15min"},
                {id: 1,value: "30min"},
                {id: 2,value: "free"},
            ]);
    const [selectedKeyword,setSelectedKeyword] = React.useState("");
    const [selectedTimer,setSelectedTimer] = React.useState("");
    const navigate = useNavigate()
        
    function addKeyword(keyword){
        if(keywordsList == null){
            setKeywordsList(() =>{
                const newKeywordsList = [{id: 0 , value: keyword}]
                let keywordJSON = JSON.stringify(newKeywordsList,undefined,1); 
                localStorage.setItem('keywordsList',keywordJSON);
                return newKeywordsList
            })
            
        }else{
            setKeywordsList(()=>{
                const newKeywordsList = keywordsList.concat([{id: keywordsList.length,value: keyword}])
                let keywordJSON = JSON.stringify(newKeywordsList,undefined,1); 
                localStorage.setItem('keywordsList',keywordJSON);
                return newKeywordsList
            })
        }
        
        
    }
    function ToPlayer(){
        if(selectedKeyword && selectedTimer){
            onSearchYoutube(selectedKeyword).then((videoId) =>{
                navigate("/player",{state: {videoId:videoId ,timer: selectedTimer}})
              })
            
        }else{
            alert("Please select keyword and timer.")
        }
    }
      async function onSearchYoutube(keyword){
        const searchKeyword = keyword + " bgm";
        let resultVideoId =""
        const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=id&q=${searchKeyword}&maxResults=5&key=${YOUTUBE_API_KEY}`;
        
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
        <div>
            {/* キーワード選択 */}
            <h2>Select Keyword</h2>
            {keywordsList !=null &&
                <ButtonList 
                valueList = {keywordsList}
                onClick = {(value)=>setSelectedKeyword(value)}    
            />
            }
            
            <AddKeyword onClick={keyword =>addKeyword(keyword)}/>
            <p>selected : {selectedKeyword}</p>
            {/* タイマー選択 */}
            <h2>Select Timer</h2>
            <ButtonList
                valueList = {timeList}
                onClick = {(value)=>setSelectedTimer(value)}
            />
            <p>selectedTimer : {selectedTimer}</p>
            {/* プレイボタン */}
            <Button value = "Play!" onClick={()=>ToPlayer()}/>
        </div>
    
    );
    
}
const AddKeyword = (props) =>{
    const [keyword,setKeyword] = React.useState("");
    const [isInput,setIsInput] = React.useState(false);
    function showInput(){
        setIsInput(true)
    }
    function handleChange(event){
        // console.log(event)
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
                    <input type="text"  onChange = {(event) => handleChange(event)}/>
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
        props.valueList.map((object) => 
            <Button 
                key={object.id.toString()}
                value = {object.value}
                onClick = {() => props.onClick(object.value)}
            />
        )
    );
}

const Button = (props) =>{
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>

    );
}

export default Form;