package com.mql.controller;

import com.mql.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author mql
 * 2019/1/21 22:01
 */
@Controller
@RequestMapping("/music")
public class MusicController {

    @Autowired
    private MusicService musicService;

}
