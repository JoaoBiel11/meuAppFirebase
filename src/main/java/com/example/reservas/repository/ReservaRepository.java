package com.example.reservas.repository;

import com.example.reservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("SELECT r FROM Reserva r WHERE r.sala.id = :salaId AND r.dataHoraInicio < :dataHoraFim AND r.dataHoraFim > :dataHoraInicio")
    List<Reserva> findReservasConflitantes(Long salaId, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);

    List<Reserva> findByUsuarioId(Long usuarioId);
}
