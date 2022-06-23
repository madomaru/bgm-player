import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyDrD3vDFJDXeSysFlHgIF67xHN3Hjm4BDc'
// import ReactDOM from 'react-dom/client';

const Form = () =>{ 
    const [keywordsList,setKeywordsList] = useState(JSON.parse(localStorage.getItem('keywordsList')));
    const [timeList,setTimeList] =useState([
                {id: 0,value: "15min"},
                {id: 1,value: "30min"},
                {id: 2,value: "free"},
            ]);
    const [selectedKeywords,setSelectedKeywords] = useState(Array(3).fill(""));//three keywords
    const [selectedTimer,setSelectedTimer] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if(!keywordsList){
            setKeywordsList(Array(3).fill().map(e=>[]))
        }
    },[]);    
    function addKeyword(index,keyword){
        console.log("yeah"+keywordsList[index].length)
        // if(keywordsList[index]){
            setKeywordsList((prevKeywordsList) =>{
                let newKeywordsList = JSON.parse(JSON.stringify(prevKeywordsList))
                newKeywordsList[index].push({id: keywordsList[index].length , value: keyword})
                let keywordJSON = JSON.stringify(newKeywordsList,undefined,1); 
                localStorage.setItem('keywordsList',keywordJSON);
                return newKeywordsList
            })
            console.log(keywordsList)
        // }else{
        //     console.log("else")
        //     setKeywordsList(()=>{
        //         const newKeywordsList = keywordsList.concat([{id: keywordsList.length,value: keyword}])
        //         let keywordJSON = JSON.stringify(newKeywordsList,undefined,1); 
        //         localStorage.setItem('keywordsList',keywordJSON);
        //         return newKeywordsList
        //     })
        // }
        
        
    }
    const selectKeyword = (index,value) =>{
        setSelectedKeywords((prevState) =>
            prevState.map(
                (prevKeyword,i) => (index ===  i  ? value : prevKeyword)
            )
        )
    }
    function ToPlayer(){
        if(selectedKeywords && selectedTimer){
            let isFree,secTimer
            if(selectedTimer == "free"){
                isFree = true
                secTimer = null
            }else{
                isFree = false
                secTimer = selectedTimer == "15min" ? 15*60 : 30*60
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
        console.log(url)
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
            <h2 className ="text-3xl font-bold">Select Keyword</h2>
            {/* {keywordsList !=null &&
                <ButtonList 
                valueList = {keywordsList}
                onClick = {(value)=>selectKeyword(0,value)}    
            />
            } */}
            
            
            

            {keywordsList && keywordsList.map((childList,index) => {
                console.log("update")
                return <div>
                    <p>{index+1}st keyword</p>
                    <ButtonList 
                        valueList = {childList}
                        onClick = {(value)=>selectKeyword(index,value)}    
                    />
                    <AddKeyword onClick={keyword =>addKeyword(index,keyword)}/>
                    <p>selected : {selectedKeywords[index]}</p>
                </div>
            })}
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
    const [keyword,setKeyword] = useState("");
    const [isInput,setIsInput] = useState(false);
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