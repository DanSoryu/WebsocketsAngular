import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../../core/services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-clientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-clientes.component.html',
  styleUrl: './form-clientes.component.css'
})
export class FormClientesComponent {
  NuevoCliente: FormGroup;

  constructor(public clientesService: ClientesService, private tostada: ToastrService) {
    this.NuevoCliente = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
    });
  }

  private getErrorMessage(campo: string, nombreCampo: string): string | null {
    const control = this.NuevoCliente.get(campo);
    if (!control || !control.errors) return null;

    const errors = control.errors;

    if (errors['required']) return `${nombreCampo}: Este campo es obligatorio`;
    if (errors['minlength']) return `${nombreCampo}: Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `${nombreCampo}: No puede tener más de ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return `${nombreCampo}: Formato inválido`;
    if (errors['email']) return `${nombreCampo}: Correo electrónico inválido`;

    return null;
  }

  enviarCliente() {
    if (this.NuevoCliente.invalid) {
      const campos: { [key: string]: string } = { nombre: 'Nombre', email: 'Email', telefono: 'Teléfono', direccion: 'Dirección' };

      Object.keys(campos).forEach((key) => {
        const errorMessage = this.getErrorMessage(key, campos[key]);
        if (errorMessage) {
          this.tostada.error(errorMessage, 'Error de validación');
        }
      });

      return;
    }

    this.clientesService.postCliente(this.NuevoCliente.value).subscribe({
      next: (data) => {
        console.log(data);
        this.tostada.success('Cliente agregado correctamente', 'Éxito');
        this.NuevoCliente.reset();
      },
      error: (data) => {
        console.error(data);
        this.tostada.error('Error al crear el cliente', 'Error del servidor');
      }
    });
  }
}