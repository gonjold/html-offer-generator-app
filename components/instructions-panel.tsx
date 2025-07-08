
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Car, 
  Palette, 
  Type, 
  Eye, 
  Download,
  HelpCircle,
  Lightbulb,
  Keyboard,
  Video
} from 'lucide-react';

interface InstructionsPanelProps {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function InstructionsPanel({ expanded, onExpandedChange }: InstructionsPanelProps) {
  const steps = [
    {
      icon: Car,
      title: "Enter Vehicle Information",
      description: "Start by filling in the year, make, and model of the vehicle. The color theme will automatically adjust based on the make you select.",
      tips: ["Use the quick-fill buttons for popular makes", "Year and model are required for export"]
    },
    {
      icon: Palette,
      title: "Choose Layout & Colors",
      description: "Select your preferred layout template and color scheme. Brand colors will be auto-selected based on your vehicle make.",
      tips: ["Try different layouts to see what works best", "Custom colors give you full control"]
    },
    {
      icon: Type,
      title: "Customize Typography",
      description: "Adjust text sizes and weights for headers, prices, and descriptions. Use presets for quick styling or customize each element individually.",
      tips: ["Bold text draws more attention", "Keep descriptions readable with smaller sizes"]
    },
    {
      icon: Download,
      title: "Configure CTAs",
      description: "Set up your call-to-action buttons with custom text, links, and styling. Multiple CTAs are supported for different actions.",
      tips: ["Keep CTA text short and action-oriented", "Test your links before exporting"]
    },
    {
      icon: Eye,
      title: "Preview & Refine",
      description: "Use the live preview to see your changes in real-time. Toggle between desktop and mobile views to ensure it looks great everywhere.",
      tips: ["Preview updates instantly", "Check mobile responsiveness"]
    },
    {
      icon: Download,
      title: "Export Your Offer",
      description: "Copy the HTML code or download as a file. The generated code is email-compatible and ready for your campaigns.",
      tips: ["Test in your email platform", "Save frequently used templates"]
    }
  ];

  const faqs = [
    {
      question: "Why aren't my changes showing in the preview?",
      answer: "Make sure you've filled in the required fields (Year, Make, Model). The preview shows once basic vehicle information is entered."
    },
    {
      question: "Can I use custom colors for specific brands?",
      answer: "Yes! Select 'Custom Colors' from the color theme dropdown and input your hex color codes manually."
    },
    {
      question: "Will the generated HTML work in all email clients?",
      answer: "Yes, the HTML is generated with inline CSS specifically for email compatibility, including Outlook, Gmail, and Apple Mail."
    }
  ];

  return (
    <Card className="mb-8 border-2 border-blue-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Getting Started Guide</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                New to the HTML Offer Generator? Follow these steps to create professional automotive offers.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExpandedChange(!expanded)}
            className="flex items-center gap-2"
          >
            {expanded ? (
              <>
                <ChevronDown className="h-4 w-4" />
                Hide Guide
              </>
            ) : (
              <>
                <ChevronRight className="h-4 w-4" />
                Show Guide
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="space-y-6">
          {/* Welcome Message */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Welcome to the HTML Offer Generator!</h4>
                <p className="text-sm text-blue-800">
                  Create stunning, email-compatible automotive offers in minutes. Our templates are designed to work 
                  perfectly in all major email clients and can be customized to match your brand.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Step-by-Step Instructions</h3>
              <Badge variant="secondary" className="text-xs">6 Steps</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <step.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="font-medium text-sm">{step.title}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                      <div className="space-y-1">
                        {step.tips.map((tip, tipIndex) => (
                          <p key={tipIndex} className="text-xs text-green-700 flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                            {tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="keyboard-shortcuts">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  Keyboard Shortcuts
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Add New Offer</span>
                      <Badge variant="outline" className="text-xs">Ctrl + N</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Export All</span>
                      <Badge variant="outline" className="text-xs">Ctrl + E</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Clear Form</span>
                      <Badge variant="outline" className="text-xs">Ctrl + R</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Toggle Preview</span>
                      <Badge variant="outline" className="text-xs">Ctrl + P</Badge>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Frequently Asked Questions
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <h4 className="font-medium text-sm mb-1">{faq.question}</h4>
                      <p className="text-xs text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="video-tutorial">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Tutorial
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-sm mb-2">Video Tutorial Coming Soon</h4>
                  <p className="text-xs text-gray-600">
                    We're creating a comprehensive video tutorial to help you get the most out of the HTML Offer Generator.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Quick Start Tip */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Pro Tip</span>
            </div>
            <p className="text-xs text-green-800">
              Start with the "Modern" typography preset and adjust from there. It provides a good balance of readability and visual impact.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
