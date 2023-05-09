package com.codestates.board.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class BoardDto {
	@Getter
	@Setter
	@AllArgsConstructor
	public static class Post {
		private String b_title;
		private String b_content;
		private boolean b_good;
		private long memberId;
		public Member getMember(){
			Member member = new Member();
			member.setMemberId(memberId);

			return member;
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private long b_id;
		private String b_title;
		private String b_content;
		private boolean b_good;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private long b_id;
		private String b_title;
		private String b_content;
		private boolean b_good;
		private String username;
	}
}
