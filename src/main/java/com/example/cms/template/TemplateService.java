package com.example.cms.template;

import com.example.cms.security.SecurityService;
import com.example.cms.template.projections.TemplateDtoDetailed;
import com.example.cms.template.projections.TemplateDtoSimple;
import com.example.cms.university.University;
import com.example.cms.university.UniversityRepository;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemplateService {
    private final TemplateRepository templateRepository;
    private final UniversityRepository universityRepository;
    private final SecurityService securityService;

    public TemplateService(TemplateRepository templateRepository,
                           UniversityRepository universityRepository,
                           SecurityService securityService) {
        this.templateRepository = templateRepository;
        this.universityRepository = universityRepository;
        this.securityService = securityService;
    }

    public TemplateDtoDetailed get(Long id) {
        // TODO: return university only if visible
        return templateRepository.findById(id).map(TemplateDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    @Secured("ROLE_MODERATOR")
    public List<TemplateDtoDetailed> getAll() {
        return templateRepository.findAll().stream().map(TemplateDtoDetailed::of).collect(Collectors.toList());
    }

    public List<TemplateDtoSimple> getAllByUniversity(Long universityID) {
        University university = universityRepository.findById(universityID).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        return templateRepository.findByUniversities_Id(universityID).stream()
                .map(TemplateDtoSimple::of)
                .collect(Collectors.toList());
    }

    @Secured("ROLE_ADMIN")
    public TemplateDtoDetailed save(String name) {
        Template template = new Template();
        template.setName(name);
        template.setContent("");

        return TemplateDtoDetailed.of(templateRepository.save(template));
    }

    @Secured("ROLE_MODERATOR")
    @Transactional
    public TemplateDtoDetailed addUniversity(Long templateID, Long universityID) {
        Template template = templateRepository.findById(templateID).orElseThrow(NotFoundException::new);
        University university = universityRepository.findById(universityID).orElseThrow(NotFoundException::new);

        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        template.getUniversities().add(university);
        return TemplateDtoDetailed.of(templateRepository.save(template));
    }

    @Secured("ROLE_MODERATOR")
    @Transactional
    public TemplateDtoDetailed removeUniversity(Long templateID, Long universityID) {
        Template template = templateRepository.findById(templateID).orElseThrow(NotFoundException::new);
        University university = universityRepository.findById(universityID).orElseThrow(NotFoundException::new);

        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        template.getUniversities().remove(university);
        return TemplateDtoDetailed.of(templateRepository.save(template));
    }

    @Secured("ROLE_ADMIN")
    public void modifyNameField(Long id, String name) {
        Template template = templateRepository.findById(id).orElseThrow(NotFoundException::new);

        template.setName(name);
        templateRepository.save(template);
    }

    @Secured("ROLE_ADMIN")
    public void modifyContentField(Long id, String content) {
        Template template = templateRepository.findById(id).orElseThrow(NotFoundException::new);

        template.setContent(content);
        templateRepository.save(template);
    }

    @Secured("ROLE_ADMIN")
    public void delete(Long id) {
        Template template = templateRepository.findById(id).orElseThrow(NotFoundException::new);
        templateRepository.delete(template);
    }
}
