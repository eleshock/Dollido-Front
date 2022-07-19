/** 공용으로 사용하는 함수를 관리하는 파일입니다. */
import { useEffect, useRef } from 'react';

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
