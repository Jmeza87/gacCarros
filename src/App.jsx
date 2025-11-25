import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Check } from 'lucide-react';


const carData = [
  {
    id: 'verde',
    name: 'Verde Luchador',
    hex: '#a59d28',
    img: '/verdeLuchador.png'
  },
  {
    id: 'gris',
    name: 'Gris Lunar',
    hex: ' #d3d3d3',
    img: 'grisGrafeno.png'
  },
  {
    id: 'negro',
    name: 'Plateado Fugaz',
    hex: '#585858',
    img: '/negroMistico.png'
  },
   {
    id: 'blanco',
    name: 'Blanco Marfil',
    hex: '#ededec',
    img: '/BlancoMarfil.png'
  },
];

const fallbackImage = 'https://placehold.co/800x600/cccccc/969696?text=Imagen+No+Disponible';

export default function App() {
  // --- ESTADOS ---
  const [selectedCar, setSelectedCar] = useState(carData[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // --- EFECTOS ---
  
  // 1. Inyectar Bootstrap dinámicamente (Restaurado para usar Bootstrap)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      // Limpieza opcional si el componente se desmonta
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // 2. Precarga de imágenes
  useEffect(() => {
    carData.forEach((car) => {
      const img = new Image();
      img.src = car.img; 
    });
  }, []);

  // --- MANEJADORES ---
  const handleColorChange = (car) => {
    if (car.id === selectedCar.id) return;
    
    // Iniciar transición de salida
    setIsFading(true);
    setHasError(false);
    
    // Esperar a que termine la animación CSS (400ms)
    setTimeout(() => {
      setSelectedCar(car);
      setIsLoading(true);
    }, 400); 
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsFading(false); // Transición de entrada
  };

  const handleImageError = () => {
    // Si la imagen falla, mostrar el fallback y el mensaje de error
    setIsLoading(false);
    setHasError(true);
    setIsFading(false);
  };

  return (

    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 w-100" style={{ overflowX: 'hidden' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            
         
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">

              
                <div className="position-relative bg-secondary bg-opacity-10 rounded-4 mb-5 d-flex align-items-center justify-content-center overflow-hidden" 
                    style={{ aspectRatio: '16/9' }}>
                  
               
                  {isLoading && (
                    <div className="position-absolute top-50 start-50 translate-middle z-3 text-primary bg-white bg-opacity-75 p-4 rounded-3 shadow-sm d-flex flex-column align-items-center">
                      <Loader2 className="mb-2 spin-animation" size={32} />
                      <small className="fw-bold">CARGANDO</small>
                    </div>
                  )}

                  {/* Mensaje de Error */}
                  {hasError && (
                    <div className="position-absolute top-50 start-50 translate-middle z-3 text-danger bg-white p-4 rounded-3 shadow border border-danger d-flex flex-column align-items-center text-center">
                      <AlertCircle className="mb-2" size={40} />
                      <span className="fw-bold">Imagen no disponible</span>
                      <p className='small mt-1 text-danger'>Usando imagen de marcador de posición.</p>
                    </div>
                  )}

                  {/* Imagen del Vehículo */}
                  <img
                    src={hasError ? fallbackImage : selectedCar.img}
                    alt={selectedCar.name}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`img-fluid w-100 h-100 object-fit-contain transition-fade ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    style={{ 
                      objectFit: 'contain', 
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                      transform: isFading ? 'scale(0.95)' : 'scale(1)'
                    }}
                  />
                </div>

                {/* CONTROLES */}
                <div className="text-center">
                  {/* Nombre del Color */}
                  <div className="mb-4" style={{ height: '40px' }}>
                    <h3 className="fw-medium text-dark animate-fade-in">
                      {selectedCar.name}
                    </h3>
                  </div>

                  {/* Botones de Color */}
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {carData.map((car) => {
                      const isSelected = selectedCar.id === car.id;
                      return (
                        <button
                          key={car.id}
                          onClick={() => handleColorChange(car)}
                          disabled={isSelected || isFading}
                          className={`btn p-0 rounded-circle position-relative transition-all ${isSelected ? 'active-ring' : 'hover-scale'}`}
                          style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: car.hex,
                            // Los estilos de borde y sombra se gestionan con la clase 'active-ring' para mayor control
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
        /* FIX DE CENTRADO: Asegura que los elementos raíz ocupen toda la altura disponible */
        /* Nota: Se han añadido las propiedades de margin: 0 y box-sizing: border-box 
           para una mejor compatibilidad y evitar desbordamientos. */
        html, body, #root, #app {
            height: 100%;
            margin: 0;
            padding: 0; /* Asegurar que no hay padding */
            box-sizing: border-box; /* Prevenir desbordamientos de ancho */
            width: 100%; /* Asegurar 100% de ancho */
            overflow-x: hidden; /* Prevenir scroll horizontal en el nivel más bajo */
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }

        /* Animaciones para el spinner y botones */
        .spin-animation { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Ajuste de animación de botones al estilo Tailwind/moderno */
        .hover-scale { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-scale:not(:disabled):hover { transform: scale(1.1); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        
        .active-ring { 
          transform: scale(1.1); 
          border: 4px solid ${selectedCar.hex}; 
          box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.1); 
        }

        /* Animación para el texto del color */
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}