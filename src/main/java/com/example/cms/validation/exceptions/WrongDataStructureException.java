package com.example.cms.validation.exceptions;

public class WrongDataStructureException extends BadRequestException{
    public WrongDataStructureException() {
        super("Wrong body data structure in request");
    }
}
