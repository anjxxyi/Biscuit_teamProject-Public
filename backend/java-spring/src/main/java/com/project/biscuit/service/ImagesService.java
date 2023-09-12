package com.project.biscuit.service;

import com.project.biscuit.model.FileData;
import com.project.biscuit.model.Images;
import com.project.biscuit.model.dto.AddImagesRequest;
import com.project.biscuit.repository.FileDataRepository;
import com.project.biscuit.repository.ImagesRepository;
import com.project.biscuit.util.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ImagesService {
    private final ImagesRepository imagesRepository;
    private final FileDataRepository fileDataRepository;
    private final String FOLDER_PATH = "..\\images\\event";
    private final String FOLDER_PATH2 = "..\\images\\goods";


    // 이미지 올리기
    public Images save(AddImagesRequest request) {
        return imagesRepository.save(request.toEntity());
    }

    // 이미지 불러오기 ( read )
    public Images findById(long no) {
        return imagesRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));
    }

    // 이미지 업로드
    public String uploadImage(MultipartFile file) throws IOException {
        Images images = imagesRepository.save(
                Images.builder()
                        .imgName(file.getOriginalFilename())
                        .type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes()))
//                        .imgPath("\\public\\images\\event\\" + file.getOriginalFilename())
                        .build());
        if (images != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }

        return null;
    }

    // 이미지 파일을 폴더에 넣기
    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(
                FileData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .filePath(filePath)
                        .build()
        );

        // 파일 경로
        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully! filePath : " + filePath;
        }

        return null;
    }

    // 이미지 파일로 압축하기
    public byte[] downloadImage(String fileName) {
        Images images = imagesRepository.findByImgName(fileName)
                .orElseThrow(RuntimeException::new);

        return ImageUtils.decompressImage(images.getImageData());
    }


    /* goods */
    // 이미지 업로드
    public String uploadGoodsImage(MultipartFile file) throws IOException {
        Images images = imagesRepository.save(
                Images.builder()
                        .imgName(file.getOriginalFilename())
                        .type(file.getContentType())
                        .imageData(ImageUtils.compressImage(file.getBytes()))
//                        .imgPath("\\public\\images\\goods\\" + file.getOriginalFilename())
                        .build());
        if (images != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }

        return null;
    }

    // 이미지 파일을 폴더에 넣기
    public String uploadGoodsImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH2 + file.getOriginalFilename();
        FileData fileData = fileDataRepository.save(
                FileData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .filePath(filePath)
                        .build()
        );

        // 파일 경로
        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully! filePath : " + filePath;
        }

        return null;
    }

}
