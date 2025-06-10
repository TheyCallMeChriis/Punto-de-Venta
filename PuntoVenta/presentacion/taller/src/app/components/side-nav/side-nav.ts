import { Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';

type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule,MatIconModule, RouterModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css'
})
export class SideNav {
  menuItem = signal<MenuItem[]>([
    {
       icon: 'home',
      label: 'Inicio',
      route: 'home'
    },
    { icon: 'groups',
      label: 'Clientes',
      route: 'cliente'
    },
    { icon: 'tv',
      label: 'Artefactos',
      route: 'artefacto'
    },
    { icon: 'engineering',
      label: 'Técnicos',
      route: 'tecnico'
    },
    { icon: 'contacts',
      label: 'Oficinistas',
      route: 'oficinista'
    },
    { icon: 'handyman',
      label: 'Casos',
      route: 'casos'
    }
    , { icon: 'manager_accounts',
      label: 'Administradores',
      route: 'admin'
    }   
])
}
