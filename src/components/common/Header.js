import React from "react";

const Header = () => {
  return (
    <header style={{ backgroundColor: 'white', height: 80 }}>
      <div>
        <div>
          로고 자리
        </div>

        <nav>
          <ul>
            <li>
              '000님' 환영합니다
            </li>
            <li>
              로그아웃
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header