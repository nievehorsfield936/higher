# Higher v2 Blueprint

## Product Vision

Higher is a personal study operating system.

It helps students know:
- what to study
- why it matters
- how prepared they are
- what to do next

Higher is not just notes, flashcards, planner, or AI chat.
It is a study coach that connects all of them.

---

## Core Experience

The main user flow:

1. Create a subject
2. Add notes
3. Higher analyses the notes live
4. Higher detects concepts
5. Higher suggests flashcards and quizzes
6. Higher builds a focus session
7. Student completes session
8. Preparation score updates
9. Dashboard changes automatically

---

## Key Screens

### Home Dashboard

Purpose:
Show the student what matters today.

Includes:
- Today's focus
- Preparation score
- Start Focus Session
- Study stats
- Upcoming assessment
- Continue recent note

---

### Subject Workspace

Purpose:
Show everything for one subject.

Includes:
- Subject readiness
- Notes
- Flashcards
- Assessments
- Progress
- Higher insight
- Start subject session

---

### Notes

Purpose:
Capture and analyse study content.

Includes:
- Notes list
- Smart editor
- Live note analysis
- Study quality score
- Detected concepts
- Flashcard previews
- AI actions

---

### Flashcards

Purpose:
Turn notes into active recall.

Includes:
- Decks
- Due cards
- Suggested cards from notes
- Review mode
- Spaced repetition later

---

### Focus Mode

Purpose:
Guide the student through a study session.

Includes:
- One task at a time
- Notes review
- Flashcards
- Quiz
- Break
- Completion summary

---

### Higher Assistant

Purpose:
Explain what the student should do next.

Includes:
- Today's recommendation
- Preparation summary
- Weak topics
- Study advice
- AI chat later

---

## Intelligence Layer

### Higher Core

Single source of truth for:
- Study brain
- Higher engine
- Higher daily
- Focus session
- Knowledge graph

### Study Brain

Tracks:
- preparation
- streak
- study minutes
- sessions this week
- due flashcards

### Higher Engine

Analyses:
- notes
- concepts
- knowledge graph
- generated flashcards
- preparation from note quality

### Higher Daily

Answers:
"What should the student study today?"

### Focus Engine

Builds:
- notes task
- flashcards task
- quiz task
- break task

---

## Design Principles

Higher should feel:
- calm
- premium
- focused
- editorial
- intelligent

Avoid:
- clutter
- too many menus
- generic AI chat
- random charts
- unnecessary screens

---

## Technical Principles

Use:
- reusable components
- shared domain types
- central hooks
- small focused files
- engines outside UI
- direct imports where needed

Avoid:
- duplicated logic
- giant screens
- fragile barrel exports
- business logic inside components

---

## v2 Priorities

1. Polish Home Dashboard
2. Polish Subject Workspace
3. Improve Note Editor
4. Build real Flashcard Review
5. Build Focus Mode v2
6. Add Study Pack generation
7. Add Higher Assistant intelligence
8. Add AI integration
9. Add accounts and sync
10. Prepare App Store launch

---

## Signature Feature

One Tap Study Pack

Input:
- one note
- one subject
- or all notes

Output:
- summary
- key concepts
- flashcards
- quiz questions
- readiness score
- focus session