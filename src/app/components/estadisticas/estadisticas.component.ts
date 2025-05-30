/* RESPUESTAS PARTE 4.1:

1. ¿En que archivo se define la interfaz Juego?
    Respuesta : Esta en src/app/interfaces/juego.interface.ts

2. ¿Que archivo maneja el estado global de los filtros?
    El servicio que se encarga de eso es src/app/services/juegos-data.service.ts

3. ¿Donde se configura el HttpClient para la aplicacion?
    Eso se hace en main.ts usando la funcion provideHttpClient() que viene con Angular standalone.

RESPUESTAS PARTE 4.2:

1. ¿Por que este proyecto NO tiene app.module.ts?
    Porque el proyecto usa la arquitectura standalone de Angular, y en ese caso ya no se necesita un modulo raiz como antes.

2. ¿Que ventaja tiene usar BehaviorSubject en el servicio de juegos?
   Sirve para guardar el estado actual de los juegos y avisar a todos los componentes que estan escuchando cuando hay un cambio. Asi todo se mantiene actualizado en tiempo real de forma sencilla.
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  totalJuegos: number = 0;
  juegosGratis: number = 0;
  juegosPago: number = 0;
  mejorJuego: any = null;
  promedioPrecio: number = 0;

  constructor(private juegosService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosService.getEstadisticas().subscribe(est => {
      this.totalJuegos = est.totalJuegos;
      this.juegosGratis = est.juegosGratis;
      this.juegosPago = est.juegosPago;
      this.mejorJuego = est.mejorRating;
      this.promedioPrecio = est.promedioPrecio;
    });
  }
}