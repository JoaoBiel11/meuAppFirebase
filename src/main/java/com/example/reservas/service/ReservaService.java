package com.example.reservas.service;

import com.example.reservas.model.Reserva;
import com.example.reservas.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva criarReserva(Reserva reserva) {
        List<Reserva> conflitos = reservaRepository.findReservasConflitantes(
                reserva.getSala().getId(),
                reserva.getDataHoraInicio(),
                reserva.getDataHoraFim()
        );

        if (conflitos.isEmpty()) {
            return reservaRepository.save(reserva);
        } else {
            throw new RuntimeException("Horário já reservado.");
        }
    }

    public void cancelarReserva(Long reservaId) {
        reservaRepository.deleteById(reservaId);
    }

    public List<Reserva> listarReservasPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }
}
