/** 공용으로 사용하는 함수를 관리하는 파일입니다. */
import { useEffect, useRef } from 'react';
// import { useBeforeunload } from "react-beforeunload";
import { Navigate } from 'react-router';


/** setInterval 안에서 setState 쓰려면 setInterval 대신에 이 함수 사용 */
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export {useInterval};



const PreventReload = (cnt) => {
    
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
      }, []);
     
      return '';


    }


const PreventGoBack = () =>{

    useEffect(() => {
        const preventGoBack = () => {
          window.history.pushState(null, '', window.location.href);
          const check = window.confirm("나가기하면 패배가 추가됩니다!!!!!!");
        if(check){
            window.location.href = "/lobby"
        }
        };
        
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', preventGoBack);
        return () => window.removeEventListener('popstate', preventGoBack);
      }, []);   
}
export {PreventReload, PreventGoBack};