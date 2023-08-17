import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import nintendo from '../../assets/images/nintendo.svg';
import playstation from '../../assets/images/playstation.svg';
import xbox from '../../assets/images/xbox.svg';
import pc from '../../assets/images/laptop-solid.svg';
import steam from '../../assets/images/steam.svg';

const MyParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "none",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            remove: {
              quantity: 4,
            },
            repulse: {
              distance: 80,
              duration: 0.9,
            },
          },
        },
        particles: {
          number: {
            value: 13, // Este es el número de partículas
            density: {
              enable: false, // Esto deshabilita la opción de densidad
            }
          },
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "random",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 8,
            straight: true,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "image",
            image: [
              {
                src: xbox,
                width: 200,
                height: 200,
              },
              {
                src: playstation,
                width: 200,
                height: 200,
              },
              {
                src: steam,
                width: 200,
                height: 200,
              },
              {
                src: pc,
                width: 200,
                height: 200,
              },
              {
                src: nintendo,
                width: 200,
                height: 200,
              },
              // Agrega más imágenes aquí...
            ],
          },
          size: {
            value: { min: 10, max: 25 },
          },
        },
        detectRetina: true,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 0,
      }}
    />
  );
};

export default MyParticles;
