import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Check } from 'lucide-react';

const carData = [
  {
    id: 'verde',
    name: 'Verde Luchador',
    hex: '#a59d28',
    baseImage: '/verdeLuchador.png',
  },
  {
    id: 'gris',
    name: 'Gris Lunar',
    hex: '#d3d3d3',
    baseImage: '/grisGrafeno.png',
  },
  {
    id: 'negro',
    name: 'Plateado Fugaz',
    hex: '#585858',
    baseImage: '/plateadoFugaz.png',
  },
  {
    id: 'blanco',
    name: 'Blanco Marfil',
    hex: '#ededec',
    baseImage: '/BlancoMarfil.png',
  },
];

const fallbackImage = 'https://placehold.co/800x600/cccccc/969696?text=Imagen+No+Disponible';

export default function App() {
  const [selectedCar, setSelectedCar] = useState(carData[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [colorTransition, setColorTransition] = useState(false);

  // Precarga de imágenes
  useEffect(() => {
    carData.forEach((car) => {
      const img = new Image();
      img.src = car.baseImage;
    });
  }, []);

  const handleColorChange = (car) => {
    if (car.id === selectedCar.id) return;
    
    setColorTransition(true);
    setHasError(false);
    
    setTimeout(() => {
      setSelectedCar(car);
      setColorTransition(false);
    }, 500);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 w-100" style={{ overflowX: 'hidden' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">

                {/* Contenedor con fondo estático */}
                <div 
                  className="position-relative rounded-4 mb-5 d-flex align-items-center justify-content-center overflow-hidden" 
                  style={{ 
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' // Fondo estático y neutral
                  }}
                >
                  
                  {isLoading && (
                    <div className="position-absolute top-50 start-50 translate-middle z-3 text-primary bg-white bg-opacity-75 p-4 rounded-3 shadow-sm d-flex flex-column align-items-center">
                      <Loader2 className="mb-2 spin-animation" size={32} />
                      <small className="fw-bold">CARGANDO</small>
                    </div>
                  )}

                  {hasError && (
                    <div className="position-absolute top-50 start-50 translate-middle z-3 text-danger bg-white p-4 rounded-3 shadow border border-danger d-flex flex-column align-items-center text-center">
                      <AlertCircle className="mb-2" size={40} />
                      <span className="fw-bold">Imagen no disponible</span>
                      <p className='small mt-1 text-danger'>Usando imagen de marcador de posición.</p>
                    </div>
                  )}

                  {/* Contenedor principal de la imagen */}
                  <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                    
                    {/* Efecto de brillo/sombra que cambia con el color */}
                    <div 
                      className="position-absolute w-100 h-100 rounded-4"
                      style={{
                        background: `radial-gradient(circle at center, ${selectedCar.hex}20 0%, transparent 70%)`,
                        opacity: colorTransition ? 0.8 : 0.4,
                        transition: 'opacity 0.5s ease, background 0.5s ease',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                      }}
                    />
                    
                    {/* Imagen del vehículo */}
                    <img
                      src={hasError ? fallbackImage : selectedCar.baseImage}
                      alt={selectedCar.name}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      className={`img-fluid h-100 object-fit-contain transition-all ${colorTransition ? 'color-change-active' : ''}`}
                      style={{ 
                        objectFit: 'contain',
                        transition: 'filter 0.5s ease, transform 0.5s ease',
                        filter: colorTransition ? 'brightness(1.3) saturate(1.2)' : 'brightness(1) saturate(1)',
                        transform: colorTransition ? 'scale(1.02)' : 'scale(1)',
                        position: 'relative',
                        zIndex: 2
                      }}
                    />
                    
                    {/* Overlay de transición de color */}
                    <div 
                      className={`position-absolute top-0 start-0 w-100 h-100 rounded-4 ${colorTransition ? 'color-overlay-active' : ''}`}
                      style={{
                        background: selectedCar.hex,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        mixBlendMode: 'overlay'
                      }}
                    />
                  </div>
                </div>

                {/* CONTROLES */}
                <div className="text-center">
                  <div className="mb-4" style={{ height: '40px' }}>
                    <h3 className="fw-medium text-dark animate-fade-in">
                      {selectedCar.name}
                    </h3>
                  </div>

                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {carData.map((car) => {
                      const isSelected = selectedCar.id === car.id;
                      return (
                        <button
                          key={car.id}
                          onClick={() => handleColorChange(car)}
                          disabled={isSelected || colorTransition}
                          className={`btn p-0 rounded-circle position-relative transition-all ${isSelected ? 'active-ring' : 'hover-scale'}`}
                          style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: car.hex,
                            border: '3px solid transparent'
                          }}
                          title={car.name}
                        >
                          {isSelected && (
                            <span className="position-absolute top-50 start-50 translate-middle text-white">
                              <Check size={28} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        html, body, #root, #app {
            height: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            width: 100%;
            overflow-x: hidden;
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }

        .spin-animation { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .hover-scale { 
          transition: transform 0.2s, box-shadow 0.2s; 
        }
        .hover-scale:not(:disabled):hover { 
          transform: scale(1.1); 
          box-shadow: 0 4px 15px rgba(0,0,0,0.2); 
        }
        
        .active-ring { 
          transform: scale(1.1); 
          border: 3px solid #fff !important;
          box-shadow: 0 0 0 3px ${selectedCar.hex}, 0 4px 15px rgba(0,0,0,0.3) !important; 
        }

        .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Efectos de transición de color mejorados */
        .color-change-active {
          animation: gentlePulse 0.5s ease-in-out;
        }
        
        @keyframes gentlePulse {
          0% { 
            filter: brightness(1) saturate(1);
            transform: scale(1);
          }
          50% { 
            filter: brightness(1.4) saturate(1.3);
            transform: scale(1.03);
          }
          100% { 
            filter: brightness(1.3) saturate(1.2);
            transform: scale(1.02);
          }
        }

        .color-overlay-active {
          animation: colorFlash 0.5s ease-in-out;
        }
        
        @keyframes colorFlash {
          0% { opacity: 0; }
          25% { opacity: 0.3; }
          50% { opacity: 0.1; }
          75% { opacity: 0.2; }
          100% { opacity: 0; }
        }

        /* Mejora la transición general */
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}