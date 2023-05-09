package com.codestates.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

//JWT 검증 전용 Security Filter 구현
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Map<String, Object> claims = verifyJws(request); // (3)
        setAuthenticationToContext(claims);      // (4)

        filterChain.doFilter(request, response); // (5)
    }

    // (6)
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");  // (6-1)

        return authorization == null || !authorization.startsWith("Bearer");  // (6-2)
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // (3-1)
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // (3-2)
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // (3-3)

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");   // (4-1)
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));  // (4-2)
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);  // (4-3)
        SecurityContextHolder.getContext().setAuthentication(authentication); // (4-4)
    }

}
