//package com.codestates.auth.handler;
//
//import com.codestates.auth.CustomAuthorityUtils;
//import com.codestates.auth.JwtTokenizer;
//import com.codestates.member.entity.Member;
//import com.codestates.oauth2.entity.OAuthUser;
//import com.codestates.oauth2.service.OAuthUserService;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import com.codestates.member.service.MemberService;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URI;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//// OAuth2 인증이 성공적으로 수행되면 호출되는 클래스입니다.
//// OAuth2 인증 후, Frontend 애플리케이션 쪽으로 JWT를 전송하는 역할을 합니다.
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler { // 손쉬운 Redirect 위해 사용
//
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils;
//    private final OAuthUserService oauthUserService;
//
//    // DI
//    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
//                                      CustomAuthorityUtils authorityUtils,
//                                      OAuthUserService oauthUserService) {
//        this.jwtTokenizer = jwtTokenizer;
//        this.authorityUtils = authorityUtils;
//        this.oauthUserService = oauthUserService;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        var oAuth2User = (OAuth2User)authentication.getPrincipal();
//        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // 이메일 주소 get
//        List<String> authorities = authorityUtils.createRoles(email);           // 권한 정보 생성
//
//
//        // 이메일 주소 DB 저장
//        saveOAuthUser(email);
//
//        // Access Token과 Refresh Token을 생성해서 Frontend 애플리케이션에 전달하기 위해 Redirect
//        redirect(request, response, email, authorities);
//    }
//
//    // oauth_user DB 상에 이메일을 저장하는 메서드
//    private void saveOAuthUser(String email) {
//        OAuthUser oAuthUser = new OAuthUser(email);
////        member.setStamp(new Stamp());
//        oauthUserService.saveOAuthUser(email);
//    }
//
//    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
//        String accessToken = delegateAccessToken(username, authorities);  // (6-1)
//        String refreshToken = delegateRefreshToken(username);     // (6-2)
//
//        String uri = createURI(accessToken, refreshToken).toString();   // (6-3)
//        getRedirectStrategy().sendRedirect(request, response, uri);   // (6-4)
//    }
//
//    private String delegateAccessToken(String username, List<String> authorities) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", username);
//        claims.put("roles", authorities);
//
//        String subject = username;
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        return accessToken;
//    }
//
//    private String delegateRefreshToken(String username) {
//        String subject = username;
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        return refreshToken;
//    }
//
//    private URI createURI(String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
////                .port(80)
//                .path("/receive-token.html")
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//    }
//}
