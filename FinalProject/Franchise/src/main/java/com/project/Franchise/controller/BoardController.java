package com.project.Franchise.controller;

// 게시판 모델과 JPA 리포지토리 import
import com.project.Franchise.model.Board;
import com.project.Franchise.repository.BoardRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 이 클래스는 REST API 컨트롤러 (JSON 데이터 반환)
@RequestMapping("/api/board") // 기본 URL 경로 설정
@CrossOrigin(origins = "*") // CORS 허용: 프론트엔드에서 이 API 사용 가능하게 함
public class BoardController {

    private final BoardRepository repo; // 게시글 DB 처리를 위한 JPA 리포지토리

    // 생성자 주입으로 repo 객체 초기화
    public BoardController(BoardRepository repo) {
        this.repo = repo;
    }

    @PostMapping // POST 요청 처리 (게시글 등록)
    public Board createPost(@RequestBody Board board) {
        // 클라이언트로부터 받은 게시글 데이터를 DB에 저장하고 저장된 객체를 반환
        return repo.save(board);
    }

    @GetMapping // GET 요청 처리 (모든 게시글 조회)
    public List<Board> getAll() {
        // DB에 저장된 전체 게시글 목록을 조회하여 리스트로 반환
        return repo.findAll();
    }
}
