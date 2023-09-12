package com.project.biscuit.repository;

import com.project.biscuit.model.User;
import com.project.biscuit.model.enums.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long no);
    User findByNo(Long no);
    Optional<User> findByUserId(String userId);
    List<User> findByAuthority(Authority authority);
    List<User> findByQuitYn(String string);
    List<User> findByAuthorityAndQuitYn(Authority authority, String string);
    boolean existsByUserId(String userId);
    boolean existsByQuitYn(String userId);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    Optional<User> findByEmailAndProvider(String email, String provider);

    Optional<User> findUserIdByEmail(String email);
    boolean existsByNameAndBirthAndPhone(String name, LocalDate birth, String phone);
    Optional<User> findIdByNameAndBirthAndPhone(String name, LocalDate birth, String phone);

    boolean existsByUserIdAndNameAndBirthAndPhone(String userId, String name, LocalDate birth, String phone);
}
