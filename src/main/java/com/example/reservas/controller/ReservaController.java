package com.example.reservas.controller;

import com.example.reservas.model.Reserva;
import com.example.reservas.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public Reserva criarReserva(@RequestBody Reserva reserva) {
        return reservaService.criarReserva(reserva);
    }

    @DeleteMapping("/{reservaId}")
    public void cancelarReserva(@PathVariable Long reservaId) {
        reservaService.cancelarReserva(reservaId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Reserva> listarReservasPorUsuario(@PathVariable Long usuarioId) {
        return reservaService.listarReservasPorUsuario(usuarioId);
    }
}
