import React, { useState, useEffect, useRef, useCallback } from 'react';
import CircuitBackground from './components/CircuitBackground';
import Visualizer from './components/Visualizer';
import SoundButton from './components/SoundButton';

const SOUNDS = [
  { id: 'nada-que-ver', label: 'NAH_QUE_VEEH', icon: 'visibility_off' },
  { id: 'no-me-quemes', label: 'NO_ME_QUEMES', icon: 'local_fire_department' },
  { id: 'no-quieros-vivir', label: 'NO_QUIERO_VIVIR', icon: 'sentiment_very_dissatisfied' },
  { id: 'latigo', label: 'WORK_HARDER', icon: 'gavel' },
  { id: 'bien-hecho', label: 'WELL_DONE', icon: 'thumb_up' },
  { id: 'noo-la-policia', label: 'POLICE_ALERT', icon: 'local_police' },
  { id: 'se-te-quito-o-no-la-falla', label: 'FALLA_FIXED', icon: 'bug_report' },
  { id: 'estoy-cansado-jefe', label: 'TIRED_BOSS', icon: 'battery_0_bar' },
  { id: 'auto-no-esta', label: 'AUTO_MISSING', icon: 'directions_car' },
  { id: 'technoloyia', label: 'TECHNOLOYIA', icon: 'memory' },
  { id: 'SnoopDogg', label: 'D_O_G_G', icon: 'music_note' },
  { id: 'el-juego-del-calamar', label: 'SQUID_GAME', icon: 'masks' },
  { id: 'carrusel-game-song', label: 'CARRUSEL_THEME', icon: 'videogame_asset' },
  { id: 'ponele-voluntad', label: 'VOLUNTAD', icon: 'fitness_center' },
  { id: 'atiendo-boludos', label: 'ATIENDO_BOLUDOS', icon: 'support_agent' },
  { id: 'dificil', label: 'DIFFICULT_LEVEL', icon: 'psychology' },
  { id: 'me siento re zarpado', label: 'RE_ZARPADO', icon: 'bolt' },
  { id: 'miau-triste', label: 'SAD_CAT', icon: 'pets' },
  { id: 'cuak', label: 'QUACK_FILE', icon: 'notification_important' },
  { id: 'ahi-lo-tenes-al-pelotudo', label: 'PELOTUDO_DETECTED', icon: 'person_off' },
  { id: 'sali-de-ahi-maravilla', label: 'MARAVILLA_EXIT', icon: 'exit_to_app' },
  { id: 'ya-llegaron-las-pipsash', label: 'PIZZA_ARRIVAL', icon: 'local_pizza' },
  { id: 'orale-cocaso', label: 'COCASO_ORALE', icon: 'sports_kabaddi' },
  { id: 'sad-violin', label: 'SAD_VIOLIN', icon: 'album' },
  { id: 'paraaaaa', label: 'HALT_STOP', icon: 'front_hand' },
  { id: 'marcho', label: 'DEPARTURE', icon: 'sailing' },
  { id: 'camion-venta', label: 'SALES_TRUCK', icon: 'local_shipping' },
  { id: 'tia-paola', label: 'TIA_PAOLA', icon: 'child_care' },
  { id: 'serepudrio', label: 'CHAOS_INIT', icon: 'error' },
  { id: 'cronica', label: 'CRONICA_NEWS', icon: 'newspaper' },
  { id: 'que-es-eso', label: 'WHAT_IS_THAT', icon: 'help_outline' },
  { id: 'a-lo-que-yo-vine', label: 'PURPOSE_FOUND', icon: 'flag' },
  { id: 'milhouse', label: 'MILHOUSE_CALL', icon: 'record_voice_over' },
  { id: 'es-hoy', label: 'TODAY_IS_THE_DAY', icon: 'today' },
  { id: 'punch', label: 'IMPACT_FX', icon: 'ads_click' },
  { id: 'cri-cri', label: 'CRICKET_SILENCE', icon: 'nature' },
  { id: 'calm', label: 'CALM_MODE', icon: 'spa' }
];

function App() {
  const [volume, setVolume] = useState(50);
  const [activeSound, setActiveSound] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', () => setActiveSound(null));

    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const newAnalyser = audioContextRef.current.createAnalyser();
      newAnalyser.fftSize = 512;
      newAnalyser.smoothingTimeConstant = 0.8;
      
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      source.connect(newAnalyser);
      newAnalyser.connect(audioContextRef.current.destination);
      
      setAnalyser(newAnalyser);
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  const playSound = useCallback((id) => {
    initAudio();
    setActiveSound(id);
    audioRef.current.src = `./sounds/${id}.mp3`;
    audioRef.current.volume = volume / 100;
    audioRef.current.play().catch(e => console.error("Playback error:", e));
  }, [initAudio, volume]);

  const handleVolumeChange = useCallback((e) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val / 100;
  }, []);

  return (
    <div className="container">
      <CircuitBackground />
      <div className="scanlines"></div>

      <div className="console">
        <div className="top-meta">
          <span className="meta-item">SYS_STATUS: OPTIMAL</span>
          <span className="meta-item">SIGNAL: ENCRYPTED</span>
          <span className="meta-item">UPLINK: ACTIVE</span>
        </div>

        <div className="header">
          <div className="title-group">
            <h1 data-text="FAFA_SOUND_OS">FAFA_SOUND_OS</h1>
            <div className="sub-title">NEURAL SOUND INTERFACE v4.0.0 (STABLE)</div>
          </div>

          <div className="volume-control">
            <div className="vol-label">GAIN_CTRL</div>
            <div className="slider-wrapper">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange}
              />
              <span className="volume-percentage">{volume}%</span>
            </div>
          </div>
        </div>

        <Visualizer analyser={analyser} />

        <div className="sound-grid-header">
          <span>INDEXED_AUDIO_FILES</span>
          <div className="header-line"></div>
        </div>

        <div className="sound-buttons">
          {SOUNDS.map(sound => (
            <SoundButton 
              key={sound.id}
              sound={sound}
              isActive={activeSound === sound.id}
              onClick={playSound}
            />
          ))}
        </div>

        <div className="footer-meta">
          <div className="footer-line"></div>
          <div className="footer-text">
            <span>TERMINAL: RX-77</span>
            <span>DEVELOPED BY <a href="https://liao.com.ar" target="_blank" rel="noopener noreferrer">LIAO MIGUEL</a></span>
            <span>(C) 2026 FAFA_CORP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
