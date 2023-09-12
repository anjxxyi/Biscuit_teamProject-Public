package com.project.biscuit.util;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Component
@Transactional
public class NaverBookInfoCrawling {

    public String searchMakersInfo(String bookDtlUrl) throws IOException, InterruptedException {

        String[] cmd = new String[] {"python", "getbookinfo.py", bookDtlUrl}; // python 실행

        ProcessBuilder pBuilder = new ProcessBuilder(cmd);

        Process process = pBuilder.start();
//        System.out.println("command: " + pBuilder.command()); 	// 커맨드 확인

        BufferedReader br = new BufferedReader(new InputStreamReader( process.getInputStream() ));

        String line = null;
        while( (line = br.readLine()) != null ){
//            System.out.println(line);
            if(line != null) break;
        }

//        int exitCode = process.waitFor();
//        System.out.println("exitCode : " + exitCode);
        process.destroy();

        return line;
    }


}
