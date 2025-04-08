package com.project.Franchise.controller;

import com.project.Franchise.model.Board;
import com.project.Franchise.repository.BoardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardRepository repo;

    public BoardController(BoardRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Board createPost(@RequestBody Board board) {
        return repo.save(board);
    }

    @GetMapping
    public List<Board> getAll() {
        return repo.findAll();
    }
}