package com.codestates.comment.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long c_id;
	@Column(nullable = false)
	private String c_content;

	// 연관관계 양방향 매핑
	@ManyToOne
	@JoinColumn(name="MEMBER_ID")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "b_id")
	private Board board;

	public String getUsername(){
		return member.getUsername();
	}
	public long getBoardId(){
		return board.getB_id();
	}

}
