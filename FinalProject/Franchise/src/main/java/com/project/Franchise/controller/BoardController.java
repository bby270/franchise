package com.project.Franchise.controller;

import com.project.Franchise.model.Board;
import com.project.Franchise.repository.BoardRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")

public class BoardController {

    private final BoardRepository repo;

    public BoardController(BoardRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Board> createPost(@RequestBody Board board) {
        Board savedBoard = repo.save(board);
        return ResponseEntity.ok(savedBoard); // 상태 200 OK와 함께 저장된 객체 반환
    }

    @GetMapping
    public ResponseEntity<List<Board>> getAll() {
        List<Board> boards = repo.findAll();
        return ResponseEntity.ok(boards); // 상태 200 OK와 함께 전체 리스트 반환
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build(); // 없으면 404
        }

        repo.deleteById(id); //
        return ResponseEntity.noContent().build(); // 성공 시 204
    }

}
