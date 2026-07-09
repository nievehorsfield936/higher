# Higher v3 Product Specification

Version: 3.0
Status: Active
Product: Higher
Author: Joe Chapman

---

# Vision

Higher is an AI-powered study operating system.

It helps students know:

- What to study
- Why it matters
- How prepared they are
- What to do next

Higher is not simply a notes app.

Higher is not a flashcard app.

Higher is not an AI chatbot.

Higher combines every study tool into one intelligent workflow.

---

# Core Principles

Every feature must answer one question:

> Does this help the student learn more effectively?

If the answer is no, it doesn't belong in Higher.

Higher should feel:

• Calm
• Intelligent
• Premium
• Minimal
• Fast
• Personal

---

# The Higher Workflow

Student opens Higher

↓

Dashboard recommends today's mission

↓

Student starts Focus Session

↓

Reads notes

↓

Reviews flashcards

↓

Completes quiz

↓

Preparation increases

↓

Dashboard updates automatically

↓

Higher recommends next task

Everything in the app revolves around this loop.

---

# Core Features

## Dashboard

Purpose

Show students exactly what they should do next.

Sections

- Greeting
- Preparation Ring
- Today's Mission
- Continue Studying
- Weekly Progress
- Upcoming Assessments
- Study Stats

Goal

Within five seconds the user knows what to study.

---

## Subject Workspace

Purpose

Everything for one subject.

Contains

- Subject Hero
- Preparation
- Notes
- Flashcards
- Assessments
- Study Pack
- Progress
- Higher Insights

Goal

No more than one tap to any study tool.

---

## Notes

Purpose

Capture information.

Features

- Rich text editor
- Markdown
- Images
- Live note analysis
- Concept extraction
- Note quality score
- AI actions
- Auto-save (future)

Goal

Writing notes should automatically create study material.

---

## Flashcards

Purpose

Active recall.

Features

- Decks
- Suggested cards
- Due cards
- Spaced repetition
- Difficulty rating
- Review statistics

Future

SM-2 spaced repetition algorithm.

---

## Quiz

Purpose

Test understanding.

Generated from

- Notes
- Flashcards
- Knowledge Graph

Question Types

- Multiple choice
- True/False
- Short answer
- Fill in the blank

---

## Study Pack

The signature feature.

Input

One note

Output

- Summary
- Concepts
- Flashcards
- Quiz
- Preparation score
- Study time estimate
- Focus Session

One tap.

No manual setup.

---

## Focus Mode

Purpose

Guide students through studying.

Flow

Notes

↓

Flashcards

↓

Quiz

↓

Break

↓

Complete

The student never has to decide what to do next.

---

## Higher Assistant

Purpose

Study coach.

Not ChatGPT.

Should answer things like

"I noticed you keep missing ANOVA."

"You've improved 6% this week."

"Spend 18 minutes reviewing Memory Encoding."

Assistant uses

- Notes
- Flashcards
- Quiz history
- Assessments
- Knowledge Graph
- Preparation score

---

# Intelligence Layer

Higher Core

Single source of truth.

Contains

- Study Brain
- Higher Engine
- Focus Engine
- Dashboard
- Recommendations

---

## Study Brain

Tracks

- Preparation
- Streak
- Sessions
- Study minutes
- Progress

---

## Higher Engine

Processes

Notes

↓

Analysis

↓

Knowledge Graph

↓

Flashcards

↓

Preparation

---

## Pipeline

One function.

processNote()

Responsible for

- Analysis
- Concepts
- Flashcards
- Quiz
- Readiness
- Recommendations

Every feature should use this pipeline.

---

# Design System

Colours

Single colour palette.

Typography

Consistent scale.

Spacing

8-point system.

Components

- GlassCard
- HeroCard
- MetricCard
- ProgressRing
- SubjectHero
- Buttons
- Empty States

Everything must use shared components.

---

# User Journey

New User

Create Subject

↓

Write First Note

↓

Study Pack Generated

↓

Focus Session

↓

Preparation Updated

↓

Dashboard Changes

↓

Habit Created

---

# Navigation

Home

↓

Subject

↓

Notes

↓

Study Pack

↓

Focus Session

↓

Dashboard

The user should rarely need more than two taps.

---

# AI Roadmap

Phase 1

Local intelligence

- Note analysis
- Flashcards
- Concepts

Phase 2

Cloud AI

- Better summaries
- Better quizzes
- Better explanations

Phase 3

Personal AI Coach

Uses

- History
- Weak topics
- Progress
- Assessments

to recommend exactly what to study.

---

# Future Features

- PDF import
- Lecture slides
- OCR
- Voice notes
- Calendar integration
- Apple Calendar
- Google Calendar
- Notifications
- Widgets
- Apple Watch
- Offline mode
- Cloud Sync

---

# Premium

Free

- Subjects
- Notes
- Flashcards
- Focus Sessions

Pro

- Unlimited AI
- Smart Study Packs
- Cloud Sync
- Advanced Analytics
- AI Tutor
- Priority Features

---

# Success Metrics

Daily Active Users

Average Study Time

Preparation Improvement

Study Streak

Flashcards Reviewed

Quiz Accuracy

Retention

---

# Technical Architecture

src/

brain/

core/

design/

session/

studyPack/

types/

components/

hooks/

store/

features/

Everything should be modular.

Business logic should never live inside screens.

---

# Golden Rule

Every screen should answer:

"What should the student do next?"

If it doesn't...

Redesign it.

---

# Long-Term Goal

Higher becomes the world's best study operating system.

Not because it has the most features.

Because it makes studying feel effortless.