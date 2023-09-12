package com.project.biscuit.controller;

import com.project.biscuit.model.Event;
import com.project.biscuit.model.FileData;
import com.project.biscuit.model.Goods;
import com.project.biscuit.model.Images;
import com.project.biscuit.model.dto.ImagesResponse;
import com.project.biscuit.repository.EventRepository;
import com.project.biscuit.repository.FileDataRepository;
import com.project.biscuit.repository.GoodsRepository;
import com.project.biscuit.repository.ImagesRepository;
import com.project.biscuit.service.ImagesService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class ImagesController {

    private final ImagesService imagesService;
    private final ImagesRepository imagesRepository;
    private final FileDataRepository fileDataRepository;

    private final EventRepository eventRepository;
    private final GoodsRepository goodsRepository;

    // 이미지 하나 불러오기 (read)
    @GetMapping("/api/images/{no}")
    public ResponseEntity<ImagesResponse> findImages(@PathVariable long no) {
        Images image = imagesService.findById(no);

        return ResponseEntity.ok()
                .body(new ImagesResponse(image));
    }


    @Value("${upload.path}") // application.properties에서 업로드 경로 설정
    private String uploadPath;

    // 썸네일 수정하기
    @PutMapping("/api/event/thumbnailimage/update/{imageNo}")
    public ResponseEntity<String> updateThumbnailImageEvent(@PathVariable Long imageNo, @RequestParam Long newEventNo) {
        try {
            Images image = imagesService.findById(imageNo);
            Event newEvent = eventRepository.findById(newEventNo)
                    .orElseThrow(() -> new EntityNotFoundException("New Event not found"));

            image.setEvent(newEvent);
            imagesRepository.save(image);

            return ResponseEntity.ok("Image event updated successfully");
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image or New Event not found");
        }
    }

    // 콘텐츠 이미지 수정하기
    @PutMapping("/api/event/contentimage/update/{imageNo}")
    public ResponseEntity<String> updateContentImageEvent(
            @PathVariable Long imageNo,
            @RequestParam("file") MultipartFile file,
            @RequestParam Long newEventNo
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            Images image = imagesService.findById(imageNo);
            // 파일 메타데이터를 데이터베이스에 저장
            FileData fileData = new FileData(file.getOriginalFilename(), file.getContentType(), "");
            fileDataRepository.save(fileData);

            String pathImg = System.getProperty("user.dir");
            // 파일을 업로드 경로에 저장
//            String filePath = uploadPath + "event\\" + file.getOriginalFilename();
            String filePath = pathImg + "\\src\\main\\resources\\image\\event\\" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            fileData.setFilePath(filePath);

            // Images 엔티티 업데이트하여 imgPath 설정
            image.setImgName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImgPath("\\images\\event\\" + file.getOriginalFilename());
            // 이미지와 이벤트 연결
            Event newEvent = eventRepository.findById(newEventNo)
                    .orElseThrow(() -> new EntityNotFoundException("New Event not found"));
            image.setEvent(newEvent);
            imagesRepository.save(image);

            fileDataRepository.save(fileData);

            return ResponseEntity.ok("File uploaded and image event updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    // 이벤트 이미지 썸네일 @@@@@@@@@@@@@@@
    @PostMapping("/api/upload/thumbnail")
    public ResponseEntity<String> uploadThumbnailFile(@RequestParam("file") MultipartFile file, @RequestParam("eventNo") Long eventNo) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            // 파일 메타데이터를 데이터베이스에 저장
            FileData fileData = new FileData(file.getOriginalFilename(), file.getContentType(), "");
            fileDataRepository.save(fileData);

            String pathImg = System.getProperty("user.dir");
            // 파일을 업로드 경로에 저장
//            String filePath = uploadPath + "event\\" + file.getOriginalFilename();
            String filePath = pathImg + "\\src\\main\\resources\\image\\event\\" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            fileData.setFilePath(filePath);

            // Images 엔티티를 업데이트하여 imgPath 설정
            Images image = new Images();
            image.setImgName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImgPath("\\images\\event\\" + file.getOriginalFilename());
            image.setThumbnailYn("Y");

            imagesRepository.save(image);

            // 이미지와 이벤트를 연결
            Event event = eventRepository.findById(eventNo).orElseThrow(() -> new EntityNotFoundException("Event not found"));
            image.setEvent(event);
            imagesRepository.save(image);

            fileDataRepository.save(fileData);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    // 이벤트 내용 이미지 @@@@@@@@@@@@@
    @PostMapping("/api/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("eventNo") Long eventNo) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            // 파일 메타데이터를 데이터베이스에 저장
            FileData fileData = new FileData(file.getOriginalFilename(), file.getContentType(), "");
            fileDataRepository.save(fileData);

            String pathImg = System.getProperty("user.dir");
            // 파일을 업로드 경로에 저장
//            String filePath = uploadPath + "event\\" + file.getOriginalFilename();
            String filePath = pathImg + "\\src\\main\\resources\\image\\event\\" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            fileData.setFilePath(filePath);

            // Images 엔티티를 업데이트하여 imgPath 설정
            Images image = new Images();
            image.setImgName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImgPath("\\images\\event\\" + file.getOriginalFilename());
//            image.setImgPath("/images/event/" + file.getOriginalFilename()); // 이거 배포할때 수정
            image.setThumbnailYn("N");

            imagesRepository.save(image);

            // 이미지와 이벤트를 연결
            Event event = eventRepository.findById(eventNo).orElseThrow(() -> new EntityNotFoundException("Event not found"));
            image.setEvent(event);
            imagesRepository.save(image);

            fileDataRepository.save(fileData);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    // 이미지 다운로드
    @GetMapping("/api/image/download/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable("fileName") String fileName) {
        byte[] downloadImage = imagesService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(downloadImage);
    }

    /* goods Img */
    // goods Thumb
    @PostMapping("/api/save/thumbnail")
    public ResponseEntity<String> uploadGoodsThumbnailFile(@RequestParam(value="file", required = false) MultipartFile file, @RequestParam("goodsNo") Long goodsNo) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            // 파일 메타데이터를 데이터베이스에 저장
            FileData fileData = new FileData(file.getOriginalFilename(), file.getContentType(), "");
            fileDataRepository.save(fileData);

            String pathImg = System.getProperty("user.dir");
            // 파일을 업로드 경로에 저장
//            String filePath = uploadPath + "goods\\" + file.getOriginalFilename();
            String filePath = pathImg + "\\src\\main\\resources\\image\\goods\\" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            fileData.setFilePath(filePath);

            // Images 엔티티를 업데이트하여 imgPath 설정
            Images image = new Images();
            image.setImgName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImgPath("\\images\\goods\\" + file.getOriginalFilename());
            image.setThumbnailYn("Y");

            imagesRepository.save(image);

            // 이미지와 이벤트를 연결
            Goods goods = goodsRepository.findById(goodsNo).orElseThrow(() -> new EntityNotFoundException("Goods not found"));
            image.setGoods(goods);
            imagesRepository.save(image);
            fileDataRepository.save(fileData);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    //goods content
    @PostMapping("/api/save/content")
    public ResponseEntity<String> uploadGoodsFile(@RequestParam("file") MultipartFile file, @RequestParam("goodsNo") Long goodsNo) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Uploaded file is empty");
        }

        try {
            // 파일 메타데이터를 데이터베이스에 저장
            FileData fileData = new FileData(file.getOriginalFilename(), file.getContentType(), "");
            fileDataRepository.save(fileData);

            String pathImg = System.getProperty("user.dir");
            // 파일을 업로드 경로에 저장
//            String filePath = uploadPath + "goods\\" + file.getOriginalFilename();
            String filePath = pathImg + "\\src\\main\\resources\\image\\goods\\" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            fileData.setFilePath(filePath);

            // Images 엔티티를 업데이트하여 imgPath 설정
            Images image = new Images();
            image.setImgName(file.getOriginalFilename());
            image.setType(file.getContentType());
            image.setImgPath("\\images\\goods\\" + file.getOriginalFilename());
            image.setThumbnailYn("N");

            imagesRepository.save(image);

            Goods goods = goodsRepository.findById(goodsNo).orElseThrow(() -> new EntityNotFoundException("Goods not found"));
            image.setGoods(goods);
            imagesRepository.save(image);

            fileDataRepository.save(fileData);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }





}
