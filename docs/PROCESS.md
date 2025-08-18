# Development Process

## Overview

This document defines a structured approach for implementing complex features and non-trivial changes in the codebase while working with AI. The process emphasizes careful planning, incremental development, and quality assurance to maintain the site's performance standards and design consistency.

The framework provides guidelines for:

- **Pre-implementation planning** with clear strategy and risk assessment
- **Structured implementation** with modern best practices and technical validation
- **Quality gates** ensuring performance, accessibility, and code standards
- **Communication protocols** for collaboration and approval workflows

This process has been refined through collaborative development sessions and captures proven patterns for successful feature delivery while maintaining the site's exceptional performance metrics (100/100/95 Lighthouse scores).

## When to Use This Process

### Apply This Structured Approach For:

- **Complex Features**: Multi-component implementations requiring 3+ steps
- **Non-trivial Changes**: Modifications affecting multiple files or systems
- **Performance-Critical Work**: Changes that could impact Lighthouse scores
- **New Integrations**: Adding external libraries or significant dependencies
- **Multi-Phase Projects**: Features requiring careful planning and coordination

### Skip This Process For:

- **Simple Edits**: Single-file changes or minor updates
- **Bug Fixes**: Straightforward fixes with clear scope
- **Documentation**: Pure documentation updates without code changes
- **Trivial Changes**: Typos, formatting, or other low-impact modifications

The goal is to use structure where it adds value, not where it creates overhead.

---

## Step-by-Step Implementation Guidelines

For each implementation step, we will follow this structured process:

### Pre-Step Planning

1. **Task Presentation**: Clearly define what we're working on in this step
2. **Strategy Explanation**: Outline the approach and technical decisions
3. **Identify Concerns**: Surface any potential issues, risks, or unknowns
4. **Clarifying Questions**: Address any clarifications needed before proceeding

### Implementation

- Follow the strategy as outlined
- Make incremental, focused changes
- **Use Context7 MCP**: Verify latest versions and best practices BEFORE implementing
- **Run type checking**: Execute `pnpm check` before major changes
- **Test functionality incrementally**: Validate each change as you build
- **Maintain performance**: Monitor bundle size and load times during development
- Document any deviations from the plan

### Post-Step Review

1. **Verification**: Confirm the step objectives were met
2. **Quality Check**: Validate code quality, performance, and accessibility
3. **Issue Documentation**: Note any problems encountered and how they were resolved
4. **Next Step Preparation**: Ensure clean handoff to the next task
5. **Commit Message**: Provide example commit message using semantic emoji format

### Debugging Protocol

When encountering implementation issues:

- **Pattern Recognition**: Framework-breaking changes often indicate API misuse rather than bugs
- **Documentation First**: Check Context7 MCP for current patterns before trial-and-error debugging
- **Version-Specific Research**: With cutting-edge frameworks (Svelte 5, Astro 5), verify syntax against latest documentation
- **API Validation**: For unexpected behavior, research the specific API rather than iterating blindly
- **Escalation Path**: Stop and ask for guidance rather than continuing if uncertain about approach

### Quality Gates

- **Functionality**: Feature works as specified
- **Performance**: No significant impact on bundle size or load times
- **Accessibility**: Keyboard navigation and screen reader support maintained
- **Code Quality**: Follows established patterns and conventions
- **Integration**: Plays well with existing components and systems

### Communication & Approval

- **Checkpoint Reviews**: Pause for approval before proceeding to next major step
- **Concern Escalation**: Surface blockers immediately; don't continue if uncertain about direction
- **Change Requests**: Document any scope changes that emerge during implementation
- **Final Review**: Confirm completion meets original objectives before marking complete
- **Stakeholder Alignment**: Ensure all parties understand progress and any adjustments

## Implementation Standards

### Testing Strategy

- **Testing Cadence**: Run full test suite only at phase boundaries
- **Test Creation**: Add new tests as functionality is verified
- **Performance Monitoring**: Check bundle size and Lighthouse scores after each phase

### Version Control & Deployment

- **Git Workflow**: User commits after each step review and approval
- **Commit Messages**: Include semantic emoji prefix followed by descriptive message.
  - `✨ | new features or enhancements`
  - `🔧 | chores, renaming, refactoring`
  - `📎 | documentation`
  - `🪲 | bug fixes`
- **Message Format**: `emoji | verb (add, update, remove, refactor, etc) description`
- **Rollback Strategy**: User handles rollback to previous version if issues arise
- **Save Points**: Each step completion serves as a checkpoint

### Code Standards

- **Dependency Management**: Follow Astro and Svelte modern best practices for component installation
- **Style Evolution**: Focus on functionality, styling refinements after everything works
- **Pattern Consistency**: Follow existing conventions, with post-phase cleanup

#### Quality Assurance

- **Browser Testing**: Comprehensive testing after functional implementation is complete
- **Documentation**: Update feature docs and implementation log after each phase
- **Integration**: Ensure new features integrate smoothly with existing systems

## Documentation Integration

This development process works hand-in-hand with our feature documentation system to ensure all planning, implementation, and learning is captured systematically.

### Feature Documentation Workflow

**Before Implementation** (Pre-Step Planning):
1. **Review existing feature docs** for similar patterns and lessons learned
2. **Create or update feature document** with requirements and status
3. **Reference implementation log** for relevant technical decisions

**During Implementation** (Implementation & Post-Step Review):
1. **Update feature status sections** as work progresses
2. **Document technical discoveries** in the implementation log
3. **Note deviations** from original plan in feature docs

**After Implementation** (Quality Assurance):
1. **Complete feature document** with final status and metrics
2. **Add comprehensive log entry** with lessons learned
3. **Update this process doc** if new patterns emerge

This integration ensures alignment, transparency, and quality at each step while building institutional knowledge for future development.

---

## Feature Documentation System

Our documentation serves dual purposes: planning documents (PRDs) for new features and historical records of implementation decisions.

### Documentation Structure

```
docs/
├── DESIGN.md              # Design system and visual guidelines
├── PROCESS.md             # This document - development process
├── ARCHITECTURE.md        # SvelteKit-specific technical patterns
└── features/
    ├── slide-in-articles.md   # Slide-in article feature
    ├── advanced-filters.md    # Multi-select filter system
    └── log.md                 # Implementation timeline and decisions
```

### Feature Documentation Format

Each feature document in `/docs/features/` follows this structure:

#### Document Header
```markdown
# Feature Name

**Status**: ✅ COMPLETE | 🚧 IN PROGRESS | 📋 PLANNED  
**Implementation Date**: YYYY-MM-DD  
**Priority**: High | Medium | Low  
```

#### Core Sections
1. **Overview**: Brief description and purpose
2. **Implementation Status**: Current state with checkboxes
3. **Technical Implementation**: Architecture and key decisions
4. **Design Specifications**: Visual and interaction design
5. **Performance Metrics**: Measurable outcomes
6. **User Experience Flow**: Step-by-step user journey
7. **Future Enhancements**: Out-of-scope items for later
8. **Development Notes**: Key decisions and lessons learned

### Feature Document Lifecycle

**Planning Phase** (📋 PLANNED):
- Create document with requirements and success criteria
- Define technical approach and performance targets
- Review and approve before implementation begins

**Implementation Phase** (🚧 IN PROGRESS):
- Update status sections as work completes
- Document technical decisions and deviations
- Record performance metrics and discoveries

**Completion Phase** (✅ COMPLETE):
- Final status update with lessons learned
- Performance validation and baseline establishment
- Knowledge capture for future reference

### Implementation Log Usage

The `/docs/features/log.md` file serves as a comprehensive project timeline and technical decision record.

#### Purpose and Structure

**Timeline Recording**:
- Major milestones and implementation phases
- Key technical discoveries and breakthroughs
- Performance achievements and optimization wins
- Architecture decisions and their rationale

**Technical Discovery Documentation**:
```markdown
### Framework Migration Rationale
**Challenge**: Complex slide-in functionality in Astro
**Investigation**: Compared Astro vs SvelteKit approaches
**Decision**: Migrate to SvelteKit for shallow routing
**Outcome**: Eliminated 3 weeks of custom state management
```

**Performance Tracking**:
```markdown
### Bundle Size Optimization
- **Target**: <500KB total bundle
- **Achieved**: 162KB (68% under target)
- **Method**: Island architecture + lazy loading
- **Impact**: Maintained 100/100 Lighthouse scores
```

#### When to Update the Log

**Major Technical Decisions**:
- Framework or library choices
- Architecture pattern selections  
- Performance optimization strategies
- Accessibility implementation approaches

**Significant Discoveries**:
- Framework-specific patterns (e.g., Svelte 5 runes usage)
- Performance bottlenecks and solutions
- Cross-browser compatibility issues
- Development workflow improvements

**Project Milestones**:
- Phase completions
- Feature launches
- Performance benchmark achievements
- Production deployments

#### Log Entry Format

```markdown
### [Decision/Discovery Title]
**Context**: Brief background of the situation
**Challenge**: What problem needed solving
**Investigation**: What approaches were considered  
**Solution**: What was implemented and why
**Result**: Measurable outcome and impact
**Learning**: Key insight for future reference
```

### Documentation Quality Standards

- **Accuracy**: Keep status updates current throughout development
- **Clarity**: Write for future developers unfamiliar with the project
- **Completeness**: Document both successes and failures
- **Consistency**: Use standard terminology and formatting

This integrated documentation system preserves planning and implementation knowledge, making it searchable and useful for future development work.
