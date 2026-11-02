import frame from '../../assets/home/gameboy-frame.png';
import portrait from '../../assets/home/street-portrait.png';

export function GameBoyPortrait() {
  return <figure className="home-portrait gameboy-portrait" aria-label="Game Boy 屏幕中的街景人物插画">
    <div className="gameboy-float">
      <img className="gameboy-screen" src={portrait} alt="橙色街景中站着一位戴眼镜的人物" />
      <img className="gameboy-shell" src={frame} alt="" aria-hidden="true" width="1024" height="1536" />
    </div>
  </figure>;
}
